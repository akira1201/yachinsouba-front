<template>
  <GmapMap
    ref="map"
    :center="{ lat: 35.6812405, lng: 139.7649308 }"
    :zoom="15"
    style="width: 100vw; height: 100vh"
  >
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  components: {},
  data() {
    return {
      map: null,
    }
  },
  computed: {
    google: gmapApi,
  },
  mounted() {
    this.$refs.map.$mapPromise.then((map) => {
      this.map = map
      this.drawHeatmap()
    })
  },
  methods: {
    drawHeatmap() {
      const latStr = 35750 // 35.75 * 1000
      const latEnd = 35580 // 35.58 * 1000
      let lat = latStr
      const lngStr = 139600 // 139.6 * 1000
      const lngEnd = 139890 // 139.89 * 1000
      let lng = lngStr
      while (lat > latEnd) {
        while (lng < lngEnd) {
          const paths = [
            { lat: lat / 1000, lng: lng / 1000 },
            { lat: (lat + 1) / 1000, lng: lng / 1000 },
            { lat: (lat + 1) / 1000, lng: (lng + 1) / 1000 },
            { lat: lat / 1000, lng: (lng + 1) / 1000 },
          ]
          const polygon = new this.google.maps.Polygon({
            paths,
            clickable: true,
            strokeWeight: 0,
            fillColor: 'red',
            // fillOpacity:
            //   ((latStr - lat) / (latStr - latEnd)) *
            //   ((lngEnd - lng) / (lngEnd - lngStr)) * 0.8,
            fillOpacity: Math.random() * 0.8,
          })
          polygon.setMap(this.map)
          lng++
        }
        lng = lngStr
        lat--
      }
    },
  },
}
</script>
