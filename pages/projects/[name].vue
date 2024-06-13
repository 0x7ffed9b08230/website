<script setup lang="ts">
const route = useRoute()
const router = useRouter()
import { initFlowbite } from 'flowbite';
import { GetArticleType } from '~/utils/articleType';
import type { IDeveloper } from '../../interfaces/IDeveloper';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";


const name = ref(route.params.name)

const {
    data: infoData,
    error: infoError,
} = await useFetch<{ data: IDeveloper }>(
    `/api/info`
);


if (infoError.value) {
    console.error(infoError.value);
}


const info = infoData.value?.data;
const _name = computed(() => name.value as string);
const repo = info?.repos.find((repo) => repo.name === _name.value);

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);


function formatDate(date: string) {
    const f = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const obj = {
        date: f,
        time: new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        days: ''
    };
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    obj.days = days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;

    return obj;
}


if (!repo) {
    router.push('/404')
} else {



    useHead({
        title: `${repo.name} - Projects`,
        meta: [
            {
                name: 'description',
                content: repo.description
            },
            {
                property: 'og:description',
                content: repo.description
            },
            {
                property: 'og:title',
                content: `${repo.name} - Projects`
            }
        ],
    })

    useSeoMeta({
        title: `${repo.name} - Projects`,
        description: repo.description,
    })

    onMounted(async () => {
        initFlowbite();
        const content = document.querySelector('.blog-content');
        const readme_raw = ref<string>(repo?.readme || '');


        if (!content || !readme_raw.value) {
            return;
        }

        const readme = await marked.parse(readme_raw.value);

        console.log(readme);


        content.innerHTML = readme;

        const images = content.querySelectorAll('img');

        images.forEach((image) => {
            const src = image.getAttribute('src');
            const alt = image.getAttribute('alt');

            if (!src) {
                return;
            }

            if (!alt) {
                image.setAttribute('alt', 'Image');
            }

            const figure = document.createElement('figure');

            const figcaption = document.createElement('figcaption');

            figcaption.textContent = alt;

            figure.appendChild(image.cloneNode(true));

            figure.appendChild(figcaption);

            image.replaceWith(figure);
        });

    });
}

function makeLicense(c: string): string {
    return c.replace(/\n/g, '<br>');
}




</script>
<template>
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article
            class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
                <address class="flex items-center mb-6 not-italic">
                    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img class="mr-4 w-16 h-16 rounded-full" :src="info.avatar_url" :alt="info.name" loading="lazy">
                        <div>
                            <a :href="`https://github.com/${info.login}`" rel="author"
                                class="text-xl font-bold text-gray-900 dark:text-white">{{ info?.name }} <span
                                    class="text-base text-gray-500 dark:text-gray-400">(@{{ info?.login
                                    }})</span></a>
                            <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate
                                    :datetime="repo.created_at" class="text-base text-gray-500 dark:text-gray-400">{{
                                        formatDate(repo.created_at).date
                                    }}</time> <span class="spacer"></span> <span
                                    class="text-base text-gray-500 dark:text-gray-400"
                                    data-tooltip-target="tooltip-updated">{{
                                        formatDate(repo.updated_at).days }}</span></p>
                            <div id="tooltip-updated" role="tooltip"
                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                This repository was last updated on <time pubdate :datetime="repo.updated_at">{{
                                    formatDate(repo.updated_at).date
                                    }}</time>
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </div>
                </address>
                <!-- Center it -->
                <div id="actions">
                    <button id="view_license"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        data-modal-target="modal-license"
                        data-modal-toggle="modal-license"
                        >
                        View License
                        <i class="fa-solid fa-scale-balanced"></i>
                    </button>

                    <a
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button" :href="repo.html_url" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                        <i class="fa-brands fa-github" style="color: white; font-size: 1.2rem;"></i>
                </a>
                    
                </div>
            </header>
            <div class="blog-content dark:text-white mt-6 text-gray-900">

            </div>
        </article>
    </div>

    <div id="modal-license" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {{ repo?.license?.name || 'License' }} ({{ repo?.license?.spdx_id || 'N/A' }})
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="modal-license">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-4 md:p-5 space-y-4 dark:text-white" v-html="makeLicense(repo?.license?.content || 'NONE')">
            </div>

        </div>
    </div>
</div>
    <br>
    <br>
    <br>
    <br>
</template>

<style scoped>
.blog-content {
    figure {
        margin-bottom: 1.5rem;
    }

    figcaption {
        font-size: 0.875rem;
        color: #6b7280;
    }


    pre {
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #f3f4f6;
    }

    details {
        margin-bottom: 1.5rem;
    }
}

#actions {
    display: inline-flex; 
    gap: 1rem;
    justify-content: center;
    align-items: center; 
    width: 100%;
    height: 100%;
    margin: auto;
}

#actions button i {
    margin-left: 0.5rem;
}

#actions a i {
    margin-left: 0.5rem;
}

</style>