<script setup lang="ts">
const route = useRoute()
const router = useRouter()
import type { IDeveloper } from '../../interfaces/IDeveloper';


const { GITHUB_USER } = process.env

const {
    data: infoData,
    error: infoError,
} = await useFetch<{ data: IDeveloper }>(
    `/api/info`
);

if (infoError) {
    console.error(infoError.value);
}


const info = infoData.value?.data;

console.log(info)


useHead({
    title: "About",
    meta: [
        {
            name: 'description',
            content: "Learn more about me."
        },
        {
            property: 'og:description',
            content: "Learn more about me."
        },
        {
            property: 'og:title',
            content: `About`
        }
    ],
})

useSeoMeta({
    title: `About`,
    description: "Learn more about me.",
})

</script>
<template>
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article
            class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div class="blog-content dark:text-white mt-6 text-gray-900">
                <ContentDoc />
            </div>
        </article>
    </div>
</template>