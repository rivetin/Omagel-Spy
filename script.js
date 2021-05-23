window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection

window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args)


    pc.oaddIceCandidate = pc.addIceCandidate

    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(' ')

        if (fields[7] === 'srflx') {



            fetch('https://api.ipgeolocation.io/ipgeo?fields=geo&apiKey=API-KEY&ip=' + fields[4])
                .then(response => response.json())
                .then(response => {
                    var element = document.createElement("div");
                    element.innerHTML = '<div style="position: relative; min-height: 100%;"><div class="logitem"><p class="statuslog">You re now chatting with a random stranger. Say STAND WITH HONG KONG AGAINST THE CCP!</p></div><div class="logitem"><p class="statuslog">You both like MUSIC.</p></div></div>'
                    document.getElementsByClassName('logbox')[0].appendChild(element);


                    console.log("<<<<<<<<<<<<<<< NEW - CHAT >>>>>>>>>>>>>>>")
                    console.log('IP Address:', fields[4])
                    console.log('city:', response.city)
                    console.log('country_name:', response.country_name)
                    console.log('district:', response.district)
                    console.log('state_prov:', response.state_prov)
                    console.log('zipcode:', response.zipcode)

                });



        }
        return pc.oaddIceCandidate(iceCandidate, ...rest)

    }

    return pc
}
