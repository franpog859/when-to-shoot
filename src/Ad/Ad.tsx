import React, {useEffect} from 'react'
import './Ad.css'

declare global {
  interface Window {
      adsbygoogle: any;
  }
}

function Ad() {
  // useEffect(() => {
  //   if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  return (
    <div className="Ad">
      {/* <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-0645475852185063"
        data-ad-slot="5520937769" /> */}
    </div>
  )
}

export default Ad
