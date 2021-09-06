<template>
    <div id="title">
        <h2>
            {{text}}
        </h2>
    </div>
</template>

<script>
export default {
    name:'Title',
    props: [
        'text'
    ],
}
</script>