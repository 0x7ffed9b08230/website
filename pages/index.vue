<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import type { IDeveloper } from '~/interfaces/IDeveloper';
import { GetArticleType } from '../utils/articleType';

const { GITHUB_USER } = process.env;

const {
    data: infoData,
    error: infoError,
} = await useFetch<{ data: IDeveloper }>(
    `/api/info`
);

if (infoError) {
    console.error(infoError);
}

const info = infoData.value.data;

onMounted(() => {
    initFlowbite();
});

const articles = await queryContent('blog')
    .sort({ date: -1 })
    .limit(2)
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
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {{ info.name }}</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                {{ info.bio }}
            </p>
            <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/about"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Learn more
                    <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>
                <a :href="`https://github.com/${GITHUB_USER}`"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <i class="fa-brands fa-github" aria-hidden="true"
                        style="font-size: 1.7rem; margin-right: 0.5rem;"></i>
                    GitHub
                </a>
            </div>
        </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="max-w-screen-md mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">My Services</h2>
                <p class="text-gray-500 sm:text-xl dark:text-gray-400">I like to work on a variety of projects. Here are
                    some of the services I offer.</p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <i class="service-icon fa-solid fa-globe w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                            aria-hidden="true" style="font-size: 1.5rem;"></i>
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Web Development</h3>
                    <p class="text-gray-500 dark:text-gray-400">I can help you build a website or web application from
                        scratch or improve an existing one.</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <i class="service-icon fa-solid fa-robot w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:text-primary-300"
                            aria-hidden="true"
                            style="font-size: 1.5rem; margin-right: 0.9rem; margin-bottom: 0.1rem;"></i>
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Automation</h3>
                    <p class="text-gray-500 dark:text-gray-400">With many
                        <Links href="https://discord.com" text="Discord" /> bots under my belt, I can help you automate
                        your workflow.
                    </p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <i class="service-icon fa-solid fa-microchip w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                            aria-hidden="true"
                            style="font-size: 1.5rem; margin-right: 0.7rem; margin-bottom: -0.1rem;"></i>
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Machine Learning</h3>
                    <p class="text-gray-500 dark:text-gray-400">I have experience with machine learning and can help you
                        build models for your data. I have made a <Links href="/osu-ai"
                            text="Osu! AI" /> in the past.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
        <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ info.public_repos }}</dt>
                    <dd class="font-light text-gray-500 dark:text-gray-400">Repositories</dd>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ info.followers }}</dt>
                    <dd class="font-light text-gray-500 dark:text-gray-400">GitHub Followers</dd>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{{ info.following }}</dt>
                    <dd class="font-light text-gray-500 dark:text-gray-400">GitHub Following</dd>
                </div>
            </dl>
        </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">My
                    Blog</h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">I write about web development,
                    programming, Vtubers, and other tech-related topics.</p>
            </div>
            <div class="grid gap-8 lg:grid-cols-2">
                <article v-for="article in articles"
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
                            :href="article._path">{{ article.title?.substring(0, 50).concat('...') }}</a></h2>
                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ article.description?.substring(0,
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

<style scoped>
.service-icon {
    /* Center it in the circle */
    margin: 0 auto;

}
</style>