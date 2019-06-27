<template>

  <el-card :class="classObject" class="scrollbarContainer">

    <div class="routers">
      <vuescroll :ops="ops">
        <router-link
          v-for="tag in visitedViews"
          ref="tag"
          :key="tag.path"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="tags-view-item"
          @click.middle.native="closeSelectedTag(tag)"

        >
          <el-tag
            :type="isActive(tag)?'success':'info'"
            :closable="!tag.meta.affix"
            class="tag"
            style="margin-right:2px;"
            @close="closeSelectedTag(tag)"
          >
            {{ tag.title }}
          </el-tag>
        </router-link>
      </vuescroll>
    </div>

    <div class="contextmenu">
      <el-tooltip
        effect="dark"
        class="tagButton"
        content="关闭其他"
        placement="top"
      >
        <el-button
          class="optionbtns"
          icon="el-icon-close"
          circle
          @click="closeOthersTags()"
        />
      </el-tooltip>
      <el-tooltip
        effect="dark"
        class="tagButton"
        content="关闭所有"
        placement="top"
      >
        <el-button
          class="optionbtns"
          icon="el-icon-delete"
          circle
          @click="closeAllTags(selectedTag)"
        />
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  components: {
    vuescroll
  },
  data() {
    return {
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          opacity: 0.5,
          background: '#cecece'
        },
        bar: {
          background: '#cecece'
        }
      }
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    },
    sidebar: function() {
      return this.$store.state.app.sidebar
    },
    classObject: function() {
      return {
        sidebarOpen: this.sidebar.opened
      }
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    }
  },
  mounted() {
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
      this.addTags()
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag{
  cursor: pointer;
}
.sidebarOpen{
  min-width: auto !important;
  width: 83vw !important;
  @media screen and (min-width: 1230px){
    width:calc(100vw - 182px) !important;
  }
}
.scrollbarContainer{
  position: fixed;
  z-index: 100;
  top: 51px;
  width: 100%;
  height: 32px;
  .routers{
    white-space: nowrap;
    margin-right:120px;
    height: 32px;
    // background-color:orange;
  }
  .contextmenu{
    // background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 32px;
    line-height: 30px;
    .optionbtns{
      padding: 5px;
    }
  }
}
</style>
<style scoped>
.scrollbarContainer >>> .el-card__body{
  padding: 0;
}
</style>

