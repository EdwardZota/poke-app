'use client';

import {
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {berryDetails} from "@/app/_services/customTypes/SingleBerryInfo";

type Props = {
    berry: berryDetails;
};

export default function BerryDetail({berry}: Props) {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Typography variant="h3" component="h1"
                        className="text-center capitalize font-bold mb-6">
                {berry.name}
            </Typography>

            <Grid container spacing={4}>
                <div>
                    <Typography variant="body1" className="font-semibold">
                        ID: <span className="font-normal">{berry.id}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Growth Time: <span className="font-normal">{berry.growth_time}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Max Harvest: <span className="font-normal">{berry.max_harvest}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Natural Gift Power: <span className="font-normal">{berry.natural_gift_power}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Size: <span className="font-normal">{berry.size}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Smoothness: <span className="font-normal">{berry.smoothness}</span>
                    </Typography>
                    <Typography variant="body1" className="font-semibold">
                        Soil Dryness: <span className="font-normal">{berry.soil_dryness}</span>
                    </Typography>
                </div>

                <div>
                    <Typography variant="h6" className="font-semibold mt-4">Firmness</Typography>
                    <Typography variant="body1">{berry.firmness.name}</Typography>

                    <Typography variant="h6" className="font-semibold mt-4">Flavors</Typography>
                    <List>
                        {berry.flavors.map((f, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={`${f.flavor.name}: ${f.potency}`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6" className="font-semibold mt-4">Item</Typography>
                    <Typography variant="body1">{berry.item.name}</Typography>

                    <Typography variant="h6" className="font-semibold mt-4">Natural Gift Type</Typography>
                    <Typography variant="body1">{berry.natural_gift_type.name}</Typography>
                </div>
            </Grid>
        </div>
    );
}