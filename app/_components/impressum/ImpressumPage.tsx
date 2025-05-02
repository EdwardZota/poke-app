'use client';

import * as React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';


export default function ImpressumPage() {
    return (
        <Container maxWidth={false} disableGutters sx={{ py: 8, pl: 6 }}>
            <Typography variant="h3" sx={{ mb: 8, pb: 6 }}>
                Impressum
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 6,
                }}
            >
                <Box sx={{ flex: '1 1 10%' }}>
                    <Stack spacing={1}>
                        <Typography variant="body1" fontWeight="bold">
                            Pokémon-Wiki Team
                        </Typography>
                        <Typography variant="body1">
                            Verantwortlich gemäß § 5 TMG:
                        </Typography>
                        <Typography variant="body1">
                            Edward Zota, Nico Schiffer, Nick Schuster
                        </Typography>
                        <Typography variant="body1">
                            Bertha-Benz-Platz 1
                        </Typography>
                        <Typography variant="body1">
                            70771 Leinfelden-Echterdingen
                        </Typography>
                        <Typography variant="body1">
                            Deutschland
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="body1" fontWeight="bold">
                                Kontakt
                            </Typography>
                            <Typography variant="body1">
                                Telefon: +49 123 456789
                            </Typography>
                            <Typography variant="body1">
                                E-Mail: kontakt@pokewiki.dev
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ flex: '1 1 40%' }}>
                    <Stack spacing={2}>
                        <Typography variant="body1" fontWeight="bold">
                            Rechtliche Hinweise
                        </Typography>
                        <Typography variant="body1">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </Typography>
                        <Typography variant="body1">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ flex: '1 1 30%' }}>
                    <Stack spacing={2}>
                        <Typography variant="body1" fontWeight="bold">
                            Quellen
                        </Typography>
                        <Typography variant="body1">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}