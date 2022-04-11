using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.EF.Models
{
    public partial class Film
    {
        public string LinkImgReal {
            get 
            {
                if (this.LinkImg == null)
                 return "assets/Images/ImageNotAvaiable.jpg";
                else
                 return this.LinkImg; 

            }
                
                
         }
    }
}
