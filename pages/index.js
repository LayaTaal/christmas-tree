import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Result from '../components/Result';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import backgroundImage from '../public/background.jpg';

export default function Home() {
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeWidth, setTreeWidth] = useState(0);
  const [rowsOfLights, setRowsOfLights] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [lengthOfLights, setLengthOfLights] = useState(0);

  function Calculator(
    e,
    { treeHeight, treeWidth, rowsOfLights, topOffset },
  ) {
    e.preventDefault();

    // Calculate Tree Angle
    const angleRadians = Math.atan(treeWidth / (2 * treeHeight));
    const angleDegrees = (angleRadians * 180) / Math.PI;
    const distanceBetweenRows =
      (treeHeight - topOffset) / rowsOfLights;

    let row = 0;
    let currentLength = topOffset;
    let circumferences = [];
    let totalCircumference = 0;

    while (currentLength < treeHeight) {
      const rowDiameter = 2 * currentLength * Math.tan(angleRadians);
      totalCircumference += Number(rowDiameter) * Math.PI;
      circumferences.push({ row, circumference: totalCircumference });
      currentLength =
        Number(currentLength) + Number(distanceBetweenRows);
      row++;
    }

    setLengthOfLights(Math.round(totalCircumference));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          How many lights do I need for my Christmas tree?
        </title>
        <meta
          name="description"
          content="Use this simple tool to figure out how many lights you need for your Christmas tree."
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1865138606278093"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main className={styles.main}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <h1 className={styles.title}>
                How many lights do I need for my Christmas tree?
              </h1>
              <p className={styles.description}>
                Well...let{"'"}s find out!
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <form
                className={styles.form}
                onSubmit={(e) =>
                  Calculator(e, {
                    treeHeight,
                    treeWidth,
                    rowsOfLights,
                    topOffset,
                  })
                }
              >
                <TextField
                  type="text"
                  id="outlined-name"
                  label="Tree Height (ft.)"
                  helperText="How tall is your tree?"
                  margin="normal"
                  required
                  fullWidth
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(e.target.value)}
                />
                <TextField
                  type="text"
                  id="outlined-name"
                  label="Tree Width (ft.)"
                  helperText="How wide is your tree at the lowest branch?"
                  margin="normal"
                  required
                  fullWidth
                  value={treeWidth}
                  onChange={(e) => setTreeWidth(e.target.value)}
                />
                <TextField
                  type="text"
                  id="outlined-name"
                  label="Rows of Lights"
                  helperText="How many rows of lights do you want?"
                  margin="normal"
                  required
                  fullWidth
                  value={rowsOfLights}
                  onChange={(e) => setRowsOfLights(e.target.value)}
                />
                <TextField
                  type="text"
                  id="outlined-name"
                  label="Top Offset (ft.)"
                  helperText="How far from the top of the tree do you want to start lights?"
                  margin="normal"
                  required
                  fullWidth
                  value={topOffset}
                  onChange={(e) => setTopOffset(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Submit
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box className={styles.card}>
                <Result lengthOfLights={lengthOfLights} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
