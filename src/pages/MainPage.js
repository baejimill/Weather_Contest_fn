import React from "react";
import Simple_centered from '../components/Simple_centered';
import Top_Header from '../components/Top_Header';
import Footer from '../components/Footer'

export default function Main() {
  return (
    <div>
      <div>
        <Top_Header/>
      </div>
      <div>
        <Simple_centered />
        {/* <Footer/> */}
      </div>
      
    </div>
  );
}
