WITH MovieEndTime AS (
SELECT
        mp.id AS "projectionId",
        mp."projectionDateTime" AS "startDateTime",
        m."runtimeMinutes",
        m."originalTitle" AS "movieName",
        (mp."projectionDateTime" + INTERVAL '1 minute' * m."runtimeMinutes") AS "endDateTime"
    FROM
        "MovieProjection" mp
    JOIN
        "Movie" m ON mp."movieId" = m.id
    WHERE
    	mp."cinemaTheaterId"::text = $1
)
SELECT
    *
FROM
    MovieEndTime
WHERE
    "startDateTime" <= $2
    AND "endDateTime" >= $3
;