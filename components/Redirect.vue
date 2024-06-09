<script setup lang="ts">
const props = defineProps({
    href: String,
    header: String,
    time: Number,
    name: String,
})

onMounted(() => {
    setTimeout(() => {
        window.location.href = props.href as string
    }, (props.time as number) * 1000)

    setInterval(() => {
        const time = document.getElementById('time')

        if (time) {
            time.textContent = (parseInt(time.textContent as string) - 1).toString()
        }
    }, 1000)
})
</script>


<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="rounded-lg p-6 max-w-md text-center">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ header }}</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">
                You will be redirected to
                <span style="padding: 0 0.5rem;">
                    <Links :href="href" :text="name" />
                </span>
                in <span id="time">{{ time }}</span> seconds.
            </p>
        </div>
    </div>
</template>