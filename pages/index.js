import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles({
  cardRoot: {
    width: 500,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(11,16,45)',
  },
  headingRoot: {
    color: 'white',
    marginBottom: '1rem',
  },
  textRoot: {
    color: 'white',
  },
  inputCardRoot: {
    backgroundColor: 'rgb(30,35,61)',
    margin: '1rem 0.625rem',
    color: 'white',
  },
  pwdBox: {
    backgroundColor: 'rgb(30,35,61)',
    margin: '1rem 0.625rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  inputCardContentRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderRoot: {
    color: 'rgb(1,51,205)',
  },
  submitButton: {
    width: '100%',
  },
  snackBarRoot: {
    backgroundColor: '#3f51b5',
  },
});

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [length, setLength] = useState(8);
  const [pwd, setPwd] = useState('');
  const [settings, setSettings] = useState({
    uppercase: false,
    lowercase: false,
    numbers: true,
    symbols: false,
  });

  useEffect(() => {
    generatePassword(length);
  }, []);

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleSettingsChange = (e) => {
    if (!e.target.checked && ifRestAreNotChecked(settings)) {
      // do nothing
    } else {
      setSettings({ ...settings, [e.target.name]: e.target.checked });
    }
  };

  const getRandomUppercase = () => {
    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return uppercaseCharacters.charAt(
      Math.floor(Math.random() * uppercaseCharacters.length)
    );
  };

  const getRandomLowercase = () => {
    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    return lowercaseCharacters.charAt(
      Math.floor(Math.random() * lowercaseCharacters.length)
    );
  };

  const getRandomNumbers = () => {
    const numbersList = '0123456789';
    return numbersList.charAt(Math.floor(Math.random() * numbersList.length));
  };

  const getRandomSymbols = () => {
    const symobolsList = '!#$%&()*+,-./:;<=>?@[]^_`{|}~';
    return symobolsList.charAt(Math.floor(Math.random() * symobolsList.length));
  };

  const ifRestAreNotChecked = (obj) => {
    let countOfNotChecked = 0;
    for (let o in obj) if (!obj[o]) countOfNotChecked++;

    if (countOfNotChecked === 3) return true;
    else return false;
  };

  const handlePasswordCopy = () => {
    setOpen(true);
    navigator.clipboard.writeText(pwd);
  };

  const handleCloseCopy = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const generatePassword = () => {
    const resultPwd = [];
    for (let i = 0; i < length; i++) {
      if (settings.uppercase) {
        resultPwd.push(getRandomUppercase());
      }
      if (settings.lowercase) {
        resultPwd.push(getRandomLowercase());
      }
      if (settings.numbers) {
        resultPwd.push(getRandomNumbers());
      }
      if (settings.symbols) {
        resultPwd.push(getRandomSymbols());
      }
    }
    setPwd(
      resultPwd
        .slice(0, length)
        .sort(() => Math.random() - 0.5)
        .join('')
    );
  };

  return (
    <>
      <main>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent>
            <Typography classes={{ root: classes.headingRoot }} variant='h4'>
              Password Generator
            </Typography>
            <Typography classes={{ root: classes.textRoot }}>
              Length: {length}
            </Typography>
            <Slider
              defaultValue={8}
              getAriaValueText={valuetext}
              aria-labelledby='discrete-slider'
              valueLabelDisplay='auto'
              onChange={(e, val) => setLength(val)}
              step={1}
              min={4}
              max={32}
              classes={{ root: classes.sliderRoot }}
            />
            <Typography classes={{ root: classes.textRoot }}>
              Settings
            </Typography>
            <Card classes={{ root: classes.inputCardRoot }}>
              <CardContent classes={{ root: classes.inputCardContentRoot }}>
                Include Uppercase
                <Switch
                  checked={settings.uppercase}
                  color='primary'
                  onChange={handleSettingsChange}
                  name='uppercase'
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.inputCardRoot }}>
              <CardContent classes={{ root: classes.inputCardContentRoot }}>
                Include Lowercase
                <Switch
                  checked={settings.lowercase}
                  color='primary'
                  onChange={handleSettingsChange}
                  name='lowercase'
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.inputCardRoot }}>
              <CardContent classes={{ root: classes.inputCardContentRoot }}>
                Include Numbers
                <Switch
                  checked={settings.numbers}
                  color='primary'
                  onChange={handleSettingsChange}
                  name='numbers'
                />
              </CardContent>
            </Card>
            <Card classes={{ root: classes.inputCardRoot }}>
              <CardContent classes={{ root: classes.inputCardContentRoot }}>
                Include Symbols
                <Switch
                  checked={settings.symbols}
                  color='primary'
                  onChange={handleSettingsChange}
                  name='symbols'
                />
              </CardContent>
            </Card>
            <Button
              classes={{ root: classes.submitButton }}
              variant='contained'
              color='primary'
              onClick={generatePassword}
            >
              Generate Password
            </Button>
            <Card
              onClick={handlePasswordCopy}
              classes={{ root: classes.pwdBox }}
            >
              <CardContent>{pwd}</CardContent>
            </Card>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseCopy}
        >
          <SnackbarContent
            classes={{ root: classes.snackBarRoot }}
            message='Copied'
          />
        </Snackbar>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto;
          background-color: rgb(92, 156, 240);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
