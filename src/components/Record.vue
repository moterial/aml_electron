<template>
    
</template>


<script>
export default {
    data() {
        return {
            input: {
                name: "",
                policy: ""
            }
        }
    },
    methods: {
        save() {
            this.$store.dispatch("insert", this.input);
        },
        load() {
            this.$store.dispatch("query");
        },
        clear() {
            this.input.name = "";
            this.input.policy = "";
        }
    }
};
</script>