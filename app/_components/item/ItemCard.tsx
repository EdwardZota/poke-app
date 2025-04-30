import React from "react";
import {itemDetails} from "@/app/_services/customTypes/SingleItemInfo";
import Link from "next/link";
import missingNo from "@/app/_pictures/pokemonCardTemplate/missingNo.png"
import {Box, Card, CardMedia, Typography} from "@mui/material";
import backgroundImage from "@/app/_pictures/pokemonCardTemplate/backgroundImage.jpg";
import trainerCard from "@/app/_pictures/pokemonCardTemplate/trainerCard.png";

type Props = {
    item: itemDetails;
};

const ItemCard = ({item}: Props) => {
    function toPascalCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const flavorText = item.flavor_text_entries.find(
        entry => entry.language.name === "en"
    )?.text || "No description available.";

    return (
        <Link href={`/pokemon/${item.name}`} style={{textDecoration: "none"}}>
            <Card
                sx={{
                    backgroundImage: `url(${trainerCard.src})`,
                    height: "35rem",
                    width: "25rem",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "1.25rem",
                }}
            >
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "6rem",
                    paddingLeft: "2.75rem",
                }}>
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "20rem",
                        }}
                    >{toPascalCase(item.name)}</Typography>
                </Box>
                <Box
                    sx={{
                        height: "11.75rem",
                        width: "auto",
                        marginLeft: "2.2rem",
                        marginRight: "2.1rem",
                        backgroundImage: `url(${backgroundImage.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "0.1rem",
                        overflow: "hidden",

                    }}
                >
                    <CardMedia
                        component="img"
                        src={item.sprites.default || missingNo.src}
                        onError={() => {
                        }}
                        sx={{
                            imageRendering: "pixelate",
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                            padding: "2rem",
                            border: "3px solid darkgray",
                        }}
                        alt={item.name}
                    />
                </Box>
                <Box
                    sx={{
                        overflowY: "auto",
                        marginTop: "1.5rem",
                        maxHeight: "10rem",

                        width: "95%",
                        scrollbarColor: "#ffffff transparent",
                    }}
                >

                    <Box sx={{paddingTop: "0.5rem", marginLeft: "4.5rem", marginRight: "3rem"}}>
                        <Typography sx={{fontSize: "1rem"}} variant="body2">
                            {flavorText}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Link>
    );
};
export default ItemCard;
