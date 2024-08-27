﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apiTestxUnit.Domains
{
    [Table("Products")]
    public class Products
    {
        [Key]
        public Guid IdProduct { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Nome do produto obrigatório!")]
        public string? Name { get; set; }

        [Column(TypeName = "DECIMAL")]
        [Required(ErrorMessage = "Preço do produto obrigatório!")]
        public decimal Price { get; set; }
    }
}
