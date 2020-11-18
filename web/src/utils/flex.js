export default () => {
  var u = navigator.userAgent;
  if (u.indexOf('Windows') > -1) {
    window.onresize = () => {
      document.querySelector('#root').style.transform = `scale(${window.innerWidth / 1920})`
      document.querySelector('#root').style.transformOrigin = `left top 0px`
      document.querySelector('#root').style.width = `1920px`
      document.querySelector('#root').style.height = `1080px`
    }
    document.querySelector('#root').style.transform = `scale(${window.innerWidth / 1920})`
    document.querySelector('#root').style.transformOrigin = `left top 0px`
    document.querySelector('#root').style.width = `1920px`
    document.querySelector('#root').style.height = `1080px`
  } else {
    window.onresize = () => {
      document.querySelector('#root').style.transform = `scale(${window.screen.availWidth / 1920})`
      document.querySelector('#root').style.transformOrigin = `left top 0px`
      document.querySelector('#root').style.width = `1920px`
      document.querySelector('#root').style.height = `1080px`
    }
    document.querySelector('#root').style.transform = `scale(${window.screen.availWidth / 1920})`
    document.querySelector('#root').style.transformOrigin = `left top 0px`
    document.querySelector('#root').style.width = `1920px`
    document.querySelector('#root').style.height = `1080px`
  }
}