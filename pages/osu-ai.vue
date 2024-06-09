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
        This is a video of the AI playing a song called
        <Links href="https://osu.ppy.sh/beatmapsets/783213#osu/1644684"
            text="UNDEAD CORPORATION - Embraced by the Flame" />.
        <br>

        <small><strong>NOTE: </strong>This video is uploaded to Google Drive, so it might not work on some devices. To
            watch the video, <Links href="https://drive.google.com/file/d/1oW3ewf5LoY3Hz-GjXToDJzbmFBRTBF-d/view"
                text="click here" />.</small>
    </p>
    <br>
    <br>
    <iframe src="https://drive.google.com/file/d/1oW3ewf5LoY3Hz-GjXToDJzbmFBRTBF-d/preview" width="1260" height="640"
        allow="autoplay"></iframe>

    <p class="text-lg text-gray-600 dark:text-gray-400" style="margin-top: 1em;">
        <strong>The AI is not open-source at the moment, as it needs a rewrite to be more user-friendly and
            developer-friendly.</strong>
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