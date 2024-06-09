<script setup lang="ts">
const route = useRoute()
import { GetArticleType, GetTypes } from '~/utils/articleType';
import { initFlowbite } from 'flowbite';


useHead({
    title: 'Blog',
    meta: [
        {
            name: 'description',
            content: 'A collection of articles on various topics.'
        },
        {
            property: 'og:description',
            content: 'A collection of articles on various topics.'
        },
        {
            property: 'og:title',
            content: 'Blog'
        }
    ]
})


const articles = await queryContent('blog')
    .sort({ date: -1 })
    .find()

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

const types = GetTypes();

onMounted(() => {
    initFlowbite();
    const filter = document.getElementById('topbar-filter') as HTMLSelectElement | null;
    const search = document.getElementById('topbar-search') as HTMLInputElement | null;

    if (!filter || !search) {
        console.error('Filter or search element not found');
        return;
    }

    filter.addEventListener('change', (e) => {
        const selected = filter.value;
        const articles = document.querySelectorAll('.grid article');
        articles.forEach((article) => {
            if (selected === 'all') {
                article.classList.remove('hidden');
            } else {
                if (article.getAttribute('data-type') !== selected) {
                    article.classList.add('hidden');
                    (article as HTMLElement).style.transition = 'opacity 0.5s';
                    document.getElementById('articles-showing')!.textContent = document.querySelectorAll('.grid article:not(.hidden)').length.toString();
                } else {
                    article.classList.remove('hidden');
                    document.getElementById('articles-showing')!.textContent = document.querySelectorAll('.grid article:not(.hidden)').length.toString();
                }
            }
        });
    });

    search.addEventListener('input', (e) => {
        const query = search.value.toLowerCase();
        const articles = document.querySelectorAll('.grid article');
        articles.forEach((article) => {
            if (!article.querySelector('h2') || !article.querySelector('p')) return;
            if (query === '') {
                article.classList.remove('hidden');
                return;
            }
            const titleElement = article.querySelector('h2')!;
            const descriptionElement = article.querySelector('p')!;
            const title = titleElement.textContent!.toLowerCase();
            const description = descriptionElement.textContent!.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                article.classList.remove('hidden');
            } else {
                article.classList.add('hidden');
            }
        });
    });
});

const amountInCategory = (category: string) => {
    return articles.filter((article) => article.type === category).length;
}
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <form action="#" method="GET" class="hidden lg:block lg:pl-2"
                style="width: 100%; max-width: 400px; margin: 0 auto; padding: 0 1rem; margin-bottom: 1px;">
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="relative mt-1 lg:w-96">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" name="query" id="topbar-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search" style="padding-right: 2.5rem;">
                </div>


            </form>

            <!-- Select menu type -->
            <section class="flex justify-between items-center mb-8 lg:mb-12">
                <div class="relative">
                    <label for="topbar-filter" class="sr-only">Filter by type</label>
                    <select id="topbar-filter"
                        class="block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="all" selected disabled>Filter by type</option>
                        <option value="all">All</option>
                        <option v-for="type in types" :value="type.type" :disabled="amountInCategory(type.type) === 0">
                            {{ type.icon }} {{ type.name }} ({{ amountInCategory(type.type) }})
                        </option>
                    </select>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">Showing <span class="font-medium"
                        id="articles-showing">{{
                            articles.length }}</span> articles</span>
            </section>


            <h2 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            <div class="grid gap-8 lg:grid-cols-2">
                <article v-for="article in articles" :data-type="article.type"
                    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-between items-center mb-5 text-gray-500">
                        <span
                            class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                            {{ GetArticleType(article.type)?.icon }}
                            {{ GetArticleType(article.type)?.type }}
                        </span>
                        <span class="text-sm">{{ formatDate(article.date).days }}</span>
                    </div>
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a
                            :href="article._path" :data-og-title="article.title">{{ article.title?.substring(0,
                                50).concat('...') }}</a></h2>
                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400"
                        :data-og-description="article.description">{{ article.description?.substring(0,
                            100).concat('...') }}</p>
                    <div class="flex justify-between items-center">
                        <a :href="article._path"
                            class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            Read more
                            <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </article>

            </div>
        </div>
    </section>
</template>