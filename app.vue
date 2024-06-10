<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import type { IDeveloper } from '~/interfaces/IDeveloper';
import jQuery from 'jquery';
import { seoKeywords } from './keys/seoKeywords';

useHead({
    meta: [
        {
            name: "description",
            content: "I do Software Development, Web Development, and Cybersecurity. I am a Full Stack Developer and a Cybersecurity Enthusiast."
        },
        {
            property: "og:description",
            content: "I do Software Development, Web Development, and Cybersecurity. I am a Full Stack Developer and a Cybersecurity Enthusiast."
        },
        {
            property: "og:image",
            content: "/static/images/seo-banner.gif",
        },
        {
            property: "og:title",
            content: "Hayden - Developer",
        },
        {
            property: "keywords",
            content: seoKeywords,
        }
    ],
    noscript: [
        {
            innerHTML: "This website requires JavaScript to function properly.",
        },
    ],
    link: [{ rel: "icon", type: "image/jpeg", href: "https://avatars.githubusercontent.com/u/171978943?v=4" }],
    bodyAttrs: {
        class: "dark:bg-gray-900",
    },
    script: [
        {
            src: "https://kit.fontawesome.com/006124650c.js"
        },
        {
            src: "https://www.google.com/recaptcha/api.js?render=explicit",
            async: true,
            defer: true,
        },
        {
            src: "/static/js/send-email.js",
        },
    ],
});

useSeoMeta({
    title: "Hayden - Developer",
    description: "I do Software Development, Web Development, and Cybersecurity. I am a Full Stack Developer and a Cybersecurity Enthusiast.",

    twitterCard: 'summary_large_image',
    twitterImage: '/static/images/seo-banner.gif',
    twitterSite: '@0x7ffed9b08230',
    themeColor: '#3498db',
    keywords: seoKeywords
})

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

    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    var themeToggle = document.getElementById('theme-toggle');

    if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeToggle) {
        return;
    }


    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.querySelector("body")?.classList.add('dark:bg-gray-900');
        (themeToggle as HTMLInputElement).checked = true;
        console.log('dark mode');
    } else {
        document.documentElement.classList.remove('dark')
        document.querySelector("body")?.classList.remove('dark:bg-gray-900');
        console.log('light mode');
    }


    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }


    themeToggle.addEventListener('click', function () {

        if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeToggle) {
            return;
        }


        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                document.querySelector("body")?.classList.add('dark:bg-gray-900');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.querySelector("body")?.classList.remove('dark:bg-gray-900');
                localStorage.setItem('color-theme', 'light');
            }

        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                document.querySelector("body")?.classList.remove('dark:bg-gray-900');

                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                document.querySelector("body")?.classList.add('dark:bg-gray-900');
                localStorage.setItem('color-theme', 'dark');
            }
        }

    });

    jQuery(document).ready(function ($) {
        $("#preloader").fadeOut("slow", function () {
            $(this).remove();
        });
    });
});

</script>

<template>
    <div id="preloader">
        <div wire:loading
            class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
            <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
    </div>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <nuxt-link to="/" class="flex items-center">
                    <img :src="info.avatar_url" class="mr-3 h-6 sm:h-9 w-auto" alt="Avatar"
                        style="border-radius: 50%;" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{{ owner?.fullName
                        }}</span>
                </nuxt-link>
                <div class="flex items-center lg:order-2">
                    <nuxt-link to="/lair"
                        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Discord</nuxt-link>

                    <label class="inline-flex items-center mb-5 cursor-pointer lg:mb-0">
                        <input type="button" value="" id="theme-toggle" style="margin-right: 10px; display: none;" />
                        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5 ml-1" fill="black" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5 ml-1" fill="white" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z">
                            </path>
                        </svg>
                    </label>


                    <button data-collapse-toggle="mobile-menu-2" type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0" id="nav-menu">
                        <li>
                            <nuxt-link to="/" exact
                                active-class="text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/about" exact
                                active-class="text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/socials" exact
                                active-class="text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Socials</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/blog" exact
                                active-class="text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/projects" exact
                                active-class="text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Projects</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <hr class="border-gray-200 dark:border-gray-700" />
    </header>


    <main class="mx-auto max-w-screen-xl px-4 lg:px-6 py-8 lg:py-10 dark:bg-gray-900" style="margin-bottom: 100px;">
        <NuxtPage />
    </main>


    <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 dark:text-white">
        <div class="mx-auto max-w-screen-xl text-center">
            <p class="my-6 text-gray-500 dark:text-gray-400">{{ info.bio }}</p>
            <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                <li>
                    <a href="/about" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="/blog" class="mr-4 hover:underline md:mr-6">Blog</a>
                </li>
                <li>
                    <a href="/contact" class="mr-4 hover:underline md:mr-6">Contact</a>
                </li>
            </ul>
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-{{ new Date().getFullYear() }}
                <a href="/" class="hover:underline">{{ info.login }}™</a>. All Rights Reserved.</span>
        </div>
    </footer>
</template>

<style>
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
}

.loader {
    border-top-color: #3498db;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>