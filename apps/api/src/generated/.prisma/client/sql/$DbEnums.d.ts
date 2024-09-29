export interface $DbEnums {}


export namespace $DbEnums {
  type Gender = "Male" | "Female" | "Other"
  type DirectorType = "Main" | "Assistant"
  type ProducerType = "Executive" | "Assistant"
  type ProjectionType = "Movie" | "TheaterPlay"
  type CinemaSeatGroupPositionEnum = "TopLeft" | "TopCenter" | "TopRight" | "CenterLeft" | "Center" | "CenterRight" | "BottomLeft" | "BottomCenter" | "BottomRight"
  type AdminRole = "SuperAdmin" | "Manager" | "Employee"
  type InputProvider = "Tmdb" | "Imdb" | "AdminInput"
  type PriceType = "Normal"
  type CurrencyCode = "RSD" | "USD" | "EUR" | "CHF"
}
