<template>
    <ul>
        <li v-for="space in spaces" :key="space.name">
            {{ space.name }}
        </li>
    </ul>
</template>

<script>

export default {
    name: 'Space',
    data: () => ({
        spaces: [
            { name: 'Scrum-Podcast'},
            { name: 'Mein Reisepodcast'}
        ]
    })
}

</script>