<script setup lang="ts">
import { initFlowbite } from 'flowbite';
const socialsList = await queryContent('/socials').findOne();

interface Social {
    id: string;
    name: string;
    icon: string;
    color: string;
    url: string;
}

//@ts-ignore
var socials = socialsList.body as Social[];

if (!socials) {
    throw new Error('No socials found');
}

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

}

//@ts-ignore
socials.forEach((social) => {
    social.id = uuidv4();
})

onMounted(() => {
    initFlowbite()
})
</script>

<template>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">Socials</h1>
    <div class="flex flex-wrap items-center justify-center">
        <div v-for="social in socials" :key="social.id" class="p-4">
            <a :href="social.url" target="_blank" class="text-2xl text-gray-800 hover:text-gray-900"
                :data-tooltip-target="`tooltip-${social.id}`">
                <img :src="`/static/images/socials/${social.icon}.svg`" :alt="social.name" class="w-8 h-8" />
                <span class="sr-only">{{ social.name }} :: {{ social.id }}</span>

            </a>

            <div v-if="social" :id="`tooltip-${social.id}`" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {{ social.name }}
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>

    </div>

</template>
