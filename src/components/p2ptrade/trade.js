import * as React from "react"
import Sidebar from "../sidebar"
import Header from "../header"
import CurrentModuleCard from "./currentModuleCard";
import SelectedModuleCard from "./selectedModuleCard";

const Trade = () => {
    return(
      <div class="flex">
          <Sidebar/>
          <div class="flex flex-col flex-grow">
              <Header pageName="P2P Trade"/>
              <div class="flex flex-col text-sm text-gray-800 w-full py-4 px-4">
                  <p class>
                      Welcome to Auto Trading. This feature allows you to put your enrolled
                      HASS module up for exchange for a chance to obtain your desired hass
                      module. At the end of the enrollment period, our algorithm will attempt
                      to help everyone who used this feature to get their desired module! 
                  </p>
                  <p class="mt-2">Instructions:</p>
                  <ol class="list-decimal w-3/4 self-center mt-2" >
                      <li class="mb-2">Click on the search button to look for HASS modules you want to trade for.</li>
                      <li class="mb-2">You can pick <em><b>up to 3</b></em> modules.</li>
                      <li class="mb-2">Distribute <em><b>all</b></em> weightage point among your selected modules </li>
                      <li class="mb-2">Click on update to save your trades</li>
                  </ol>
                  <p class="font-light text-sm" ><em>All trades are done based on availability 
                      and there is <strong>NO GUARANTEE</strong> you will get your desired module, 
                      so choose wisely</em>
                  </p>
                  <h2 class="font-bold text-3xl pt-2">Current Module</h2>
                  
                  <CurrentModuleCard 
                    courseCode="02.102DH" 
                    courseName="The World Since 1400"
                    instructorFirstName="Yang Huei"
                    instructorLastName="Pang"/>
                      
                  <h2 class="font-bold text-3xl pt-2">Selected Modules</h2>
                  <p class="font-light text-sm">Your Selection is Updated</p>
                  
                  <SelectedModuleCard
                    courseCode="02.105DH"
                    courseName="Sages Through The Ages: Readings in Early Indian and Chinese Religion and Philosophy"
                    selectionIndex="1."
                  />
                  <SelectedModuleCard
                    courseCode="02.155TS"
                    courseName="Design Anthropology"
                    selectionIndex="2."
                  />
                  <SelectedModuleCard
                    courseCode="02.216"
                    courseName="Southeast Asia Under Japan: Motives, Memoirs, and Media"
                    selectionIndex="3."
                  />
                  


              </div>
          </div>
      </div>
);
}

export default Trade;