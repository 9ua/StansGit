<template>
    <div class="pageindex">
        <mu-container style="max-width: 400px; width:100%;height:60px;">
            <mu-bottom-nav :value.sync="shift" shift>
                <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="books" title="Books" icon="books"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      shift: 'movies'
    }
  }
}
</script>
<style lang="scss">
.pageindex{
    height: 100%;
}
</style>

