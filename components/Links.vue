<script setup lang="ts">
defineProps({
  href: String,
  text: String,
})

const isSameOrigin = (url: string) => {
  if (url.startsWith('http') || url.startsWith('https') || url.startsWith('www')) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <a :href="href" class="text-primary-600 dark:text-primary-400 hover:underline" v-if="isSameOrigin(href as string)">
    {{ text }}
  </a>

  <a :href="href" class="text-primary-600 dark:text-primary-400 hover:underline" v-else>
    {{ text }}

    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
</template>