'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ImpressumPage() {
    return (
        <Container maxWidth={false} disableGutters sx={{py: 8, pl: 6}}>
            <Typography variant="h3" sx={{mb: 8, pb: 6}}>
                Impressum
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 6,
                }}
            >
                <Box sx={{flex: '1 1 10%'}}>
                    <Typography variant="body1" component="p">
                        <strong>Pokémon-Wiki Team</strong>
                        <br/>
                        Verantwortlich gemäß § 5 TMG:
                        <br/>
                        Edward Zota, Nico Schiffer, Nick Schuster
                        <br/>
                        Bertha-Benz-Platz 1
                        <br/>
                        70771 Leinfelden-Echterdingen
                        <br/>
                        Deutschland
                        <br/>
                        <br/>
                        <strong>Kontakt</strong>
                        <br/>
                        Telefon: +49 123 456789
                        <br/>
                        E-Mail: kontakt@pokewiki.dev
                    </Typography>
                </Box>

                <Box sx={{flex: '1 1 40%'}}>
                    <Typography variant="body1" component="p">
                        <strong>Rechtliche Hinweise</strong>
                        <br/>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                        nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        <br/>
                        <br/>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                        des jeweiligen Autors bzw. Erstellers.
                    </Typography>
                </Box>

                <Box sx={{flex: '1 1 30%'}}>
                    <Typography variant="body1">
                        <strong>Quellen</strong>
                        <br/>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
                        nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}



