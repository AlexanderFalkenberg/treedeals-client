<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <input
      :style="[errors[name] ? { border: '1px solid red !important' } : {}]"
      :name="name"
      :placeholder="placeholder"
      :id="name"
      type="text"
      class="
        block
        w-full
        px-3
        py-2
        border border-gray-300
        rounded
        focus:border-gray-200
        focus:outline-none
        focus:shadow-outline-green
        focus:ring-2
        focus:ring-offset-0
        focus:ring-green-200
      "
      v-model="input"
      @keyup="$emit('update:input', input)"
    />
    <div class="h-3">
      <div class="text-sm text-red-500" v-if="errors[name]">
        {{ errors[name][0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    }
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    label: {
      required: false,
      type: String,
    },
    errors: {
      required: true,
    },
  },
}
</script>
