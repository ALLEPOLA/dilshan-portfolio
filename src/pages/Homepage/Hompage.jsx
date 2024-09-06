import About from "../../components/About/About";
import Contacts from "../../components/Contacts/Contacts";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";
import Services from "../../components/Services/Services";
import Skils from "../../components/Skils/Skils";


const Homepage = () => {
  return (
    <div>
  
      <About/>
    <ProfileAbout></ProfileAbout>
   <Skils></Skils>
      <Services/>
      <Contacts/>
      
    
    </div>
  );
};

export default Homepage;
