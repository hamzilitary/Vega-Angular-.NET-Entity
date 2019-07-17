using System.ComponentModel.DataAnnotations;
using System;
namespace VEGA1.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
    }
}