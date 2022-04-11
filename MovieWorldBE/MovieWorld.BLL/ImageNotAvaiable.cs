using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.BLL
{
    public static class ImageNotAvaiable
    {
        public static string ImageNotFound(this string img)
        {
            img= "assets/Images/ImageNotAvaiable.jpg";
            return img;
        }
    }
}
