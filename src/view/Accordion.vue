<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="'heading' + t_k">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapse' + t_k"
        aria-expanded="false"
        :aria-controls="'collapse' + t_k"
      >
        <slot name="top"></slot>
      </button>
    </h2>
    <div
      :id="'collapse' + t_k"
      class="accordion-collapse collapse"
      :aria-labelledby="'heading' + t_k"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: ["t_k"],
  data() {
    return{
        
    }
  },
};
</script>

<style>
</style>