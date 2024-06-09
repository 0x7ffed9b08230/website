<script setup lang="ts">
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite()
})
</script>

<template>

    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">osu! AI</h1>

    <p class="text-lg text-gray-600 dark:text-gray-400">
        <q>osu! is a free-to-play rhythm game developed and published by Australian developer Dean "peppy" Herbert.
            Originally released for Microsoft Windows in 2007, the game has also been ported to macOS,
            Linux, Android and iOS. Its gameplay is based on commercial titles including Osu! Tatakae! Ouendan,
            Elite Beat Agents, Taiko no Tatsujin, beatmania IIDX, O2Jam, and DJMax.</q>
    </p>
    

    <p class="text-lg text-gray-600 dark:text-gray-400">
        This is a video of the AI playing a song called <Links href="https://osu.ppy.sh/beatmapsets/783213#osu/1644684" text="UNDEAD CORPORATION - Embraced by the Flame" />.
    </p>

    <video class="w-full" controls autoplay muted>
        <source src="/static/videos/osu-ai/UNDEAD CORPORATION_Embraced by the Flame.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <p class="text-lg text-gray-600 dark:text-gray-400" style="margin-top: 1em;">
        <strong>The AI is not open-source at the moment, as it needs a rewrite to be more user-friendly and developer-friendly.</strong>
    </p>


</template>

<style scoped>
q {
    font-style: italic;
    display: block;
    margin: 1em 0;
    padding: 0 1em;
    border-left: 3px solid #ccc;
}

video {
    margin-top: 1em;
}
</style>