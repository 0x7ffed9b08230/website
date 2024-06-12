<script setup lang="ts">
const route = useRoute();
import type { IDeveloper } from '../interfaces/IDeveloper';

const {
    data: infoData,
    error: infoError,
} = await useFetch<{ data: IDeveloper }>(
    `/api/info`
);

if (infoError) {
    console.error(infoError);
}

const info = infoData.value?.data;

const repos = info?.repos;

const languageList = [
    {
        "name": "TypeScript",
        "color": "bg-blue-600"
    },
    {
        "name": "JavaScript",
        "color": "bg-yellow-400"
    },
    {
        "name": "Python",
        "color": "bg-blue-500"
    },
    {
        "name": "C++",
        "color": "bg-pink-500"
    },
    {
        "name": "C",
        "color": "bg-gray-600"
    },
    {
        "name": "PHP",
        "color": "bg-indigo-700"
    },
    {
        "name": "Shell",
        "color": "bg-green-400"
    },
    {
        "name": "HTML",
        "color": "bg-red-600"
    },
    {
        "name": "CSS",
        "color": "bg-purple-700"
    },
    {
        "name": "Rust",
        "color": "bg-orange-300"
    },
    {
        "name": "Lua",
        "color": "bg-blue-900"
    },
];

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

    <section class="bg-white dark:bg-gray-900" v-if="repos">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Projects</h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">These are all my projects found on my
                    <Links :href="`https://github.com/${info.login}`" text="Github" />
                </p>
            </div>
            <div class="grid gap-8 lg:grid-cols-2">
                <article v-for="repo in repos"
                    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-between items-center mb-5 text-gray-500">
                        <span
                            class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">


                            {{ repo.language }}
                        </span>
                        <span class="text-sm">{{ formatDate(repo.created_at).days }}</span>
                        
                    </div>
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a
                            :href="repo.rel_link">{{ repo.name }}</a></h2>
                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ repo.description?.substring(0,
                        100).concat('...') }}</p>
                    <div class="flex justify-between items-center">
                        <a :href="repo.rel_link"
                            class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            View
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