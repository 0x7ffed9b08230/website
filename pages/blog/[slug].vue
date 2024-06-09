<script setup lang="ts">
const route = useRoute()
const router = useRouter()
import { GetArticleType } from '~/utils/articleType';
import type { IDeveloper } from '../../interfaces/IDeveloper';


const slug = ref(route.params.slug)


const { GITHUB_USER } = process.env

const _slug = computed(() => (slug.value as string).replace(/_/g, '-').replace("/", ""))

const article = await queryContent('blog').where({ _path: `/blog/${_slug.value}` }).findOne()

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

const {
    data: infoData,
    error: infoError,
} = await useFetch<{ data: IDeveloper }>(
    `/api/info`
);

if (!article) {
    router.push('/404')
} else



    if (infoError) {
        console.error(infoError.value);
    }


const info = infoData.value?.data;

console.log(info)


useHead({
    title: `${article.title} - Blog`,
    meta: [
        {
            name: 'description',
            content: article.description,
        },
        {
            property: 'og:description',
            content: article.description
        },
        {
            property: 'og:image',
            content: `/static/images/blog/${article.cover}`
        },
        {
            property: 'og:title',
            content: `${article.title} - Blog`
        }
    ],
})

useSeoMeta({
    title: `${article.title} - Blog`,
    description: article.description,
    ogImage: `/static/images/blog/${article.cover}`,
    twitterCard: 'summary_large_image',
    twitterImage: `/static/images/blog/${article.cover}`,
})

onMounted(() => {
    const content = document.querySelector('.blog-content');
    if (!content) {
        return;
    }

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

</script>
<template>
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article
            class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
                <address class="flex items-center mb-6 not-italic">
                    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img class="mr-4 w-16 h-16 rounded-full"
                            :src="info.avatar_url" :alt="info.name"
                            loading="lazy">
                        <div>
                            <a :href="`https://github.com/${info.login}`" rel="author"
                                class="text-xl font-bold text-gray-900 dark:text-white">{{ info?.name }} <span
                                    class="text-base text-gray-500 dark:text-gray-400">(@{{ info?.login
                                    }})</span></a>
                            <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate :datetime="article.date"
                                    class="text-base text-gray-500 dark:text-gray-400">{{ formatDate(article.date).date
                                    }}</time></p>
                        </div>
                    </div>
                </address>

                <img class="w-full mb-6 rounded-lg" :src="`/static/images/blog/${article.cover}`" loading="lazy"
                    :alt="article.title">

                <h1
                    class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {{ article.title }}
                </h1>
            </header>
            <p class="lead">{{ article.description }}</p>
            <div class="blog-content dark:text-white mt-6 text-gray-900">
                <ContentDoc />
            </div>
        </article>
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
    }
</style>