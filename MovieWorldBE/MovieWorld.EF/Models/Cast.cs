// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace MovieWorld.EF.Models
{
    public partial class Cast
    {
        public Cast()
        {
            Realize = new HashSet<Realize>();
        }

        public Guid ActorsDirectorId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Img { get; set; }
        public string LinkBiography { get; set; }
        public Guid? IdRole { get; set; }

        public virtual RoleOfCast IdRoleNavigation { get; set; }
        public virtual ICollection<Realize> Realize { get; set; }
    }
}