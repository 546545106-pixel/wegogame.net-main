<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
})

const handleImageError = (event) => {
  if (event.target.src !== 'https://img.gamemonetize.com/default/512x512.jpg') {
    event.target.src = 'https://img.gamemonetize.com/default/512x512.jpg'
  }
}
</script>

<template>
  <div>
    <LinkWidget :href="'/' + props.game.link" class="aspect-square">
      <img
        class="h-full w-full rounded-2xl shadow-md"
        v-lazy="props.game.thumb || 'https://img.gamemonetize.com/default/512x512.jpg'"
        :alt="props.game.title"
        @error="handleImageError($event)"
      />
    </LinkWidget>
  </div>
</template>

<style scoped>
/* 游戏封面：点击进入详情页，不在此嵌入第三方广告代码，避免与站点 AdSense 发布商 ID 不一致 */
</style>
