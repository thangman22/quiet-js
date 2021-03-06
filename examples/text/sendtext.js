(() => {
  window.Quiet.init({
    profilesPath: '/quiet-profiles.json',
    memoryInitializerPath: '/quiet-emscripten.js.mem',
    emscriptenPath: '/quiet-emscripten.js'
  })
  var btn
  var textbox
  var warningbox
  var transmit

  function onTransmitFinish () {
    textbox.focus()
    btn.addEventListener('click', onClick, false)
    btn.disabled = false
    var originalText = btn.innerText
    btn.innerText = btn.getAttribute('data-quiet-sending-text')
    btn.setAttribute('data-quiet-sending-text', originalText)
  };

  function onClick (e) {
    e.target.removeEventListener(e.type, arguments.callee)
    e.target.disabled = true
    var originalText = e.target.innerText
    e.target.innerText = e.target.getAttribute('data-quiet-sending-text')
    e.target.setAttribute('data-quiet-sending-text', originalText)
    var payload = textbox.value
    if (payload === '') {
      onTransmitFinish()
      return
    }
    transmit.transmit(window.Quiet.str2ab(payload))
  };

  function onQuietReady () {
    var profilename = document.querySelector('[data-quiet-profile-name]').getAttribute('data-quiet-profile-name')
    transmit = window.Quiet.transmitter({ profile: profilename, onFinish: onTransmitFinish, clampFrame: false })
    btn.addEventListener('click', onClick, false)
  };

  function onQuietFail (reason) {
    console.log('quiet failed to initialize: ' + reason)
    warningbox.classList.remove('hidden')
    warningbox.textContent = 'Sorry, it looks like there was a problem with this example (' + reason + ')'
  };

  function initQuiet () {
    btn = document.querySelector('[data-quiet-send-button]')
    textbox = document.querySelector('[data-quiet-text-input]')
    warningbox = document.querySelector('[data-quiet-warning]')
    window.Quiet.addReadyCallback(onQuietReady, onQuietFail)
  };

  document.addEventListener('DOMContentLoaded', initQuiet)
})()
