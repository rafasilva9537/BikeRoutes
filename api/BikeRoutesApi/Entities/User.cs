using System;
using System.Collections.Generic;

namespace BikeRoutesApi.Entities;

public partial class User
{
    public long Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Photo { get; set; }

    public virtual ICollection<BikeRoute> BikeRoutes { get; set; } = new List<BikeRoute>();
}
