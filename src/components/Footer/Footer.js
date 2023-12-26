import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaSnapchatGhost } from "react-icons/fa";


const Footer = () => {

  return (
    <footer className="grid grid-cols-1 px-16 text-gray-600 bg-gray-100 justify-items-center gap-y-10 py-14 md:grid-cols-4">
			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">ABOUT</h5>
				<p>How Airbnb works</p>
				<p>Newsroom</p>
				<p>Investors</p>
				<p>Airbnb Plus</p>
				<p>Airbnb Luxe</p>
			</div>

			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">COMMUNITY</h5>
				<p>Accessibility</p>
				<p>This is not a real site</p>
				<p>It's a pretty awesome clone</p>
				<p>Referrals accepted</p>
				<p>Papafam</p>
			</div>

			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">HOST</h5>
				<p>Papa React</p>
				<p>Presents</p>
				<p>Zero to Full Stack Hero</p>
				<p>Hundreds of Students</p>
				<p>Join Now</p>
			</div>

			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">SUPPORT</h5>
				<p>help Centre</p>
				<p>Trust & Safety</p>
				<p>Say Hi Youtube</p>
				<p>Easter Eggs</p>
				<p>For the win</p>
			</div>
			{/* //   <div className="bg-white border-t-2 shadow-md  shadow-gray-300 sticky bottom-0 h-20 w-full flex items-center justify-center gap-6">
    //   {icons.map((icon) => (
        // <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
        //   {icon}
        // </div>
    //   ))} */} 
			<div className="footer__copyright">
            	<div className="copy__text col-10">
             	 <span>© 2021 Airbnb, Inc, All rights reserved</span>
             	 <span>
                <a href="">. Quyền riêng tư</a>
            	  </span>
            	  <span>
             	   <a href="">. Điều khoản</a>
           	   </span>
           	   <span>
                <a href="">. Sơ đồ trang web</a>
            	  </span>
            </div>
          </div>
			
		</footer>
  
  );
};

export default Footer;
