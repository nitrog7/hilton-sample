import {css} from './css';

export const styles = {
  btnBar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 10,
    paddingTop: 18
  },
  buttonLabel: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500'
  },
  buttonLargePrimary: {
    backgroundColor: css.primaryColor,
    borderRadius: 35,
    height: 50
  },
  container: {
    backgroundColor: css.bgColor,
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50
  },
  description: {
    color: '#8e8e8e',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  h1: {
    color: '#484848',
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    marginBottom: 5
  },
  h2: {
    color: '#484848',
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    marginBottom: 5,
    paddingBottom: 5
  },
  h3: {
    color: '#292929',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 0
  },
  headerTxt: {
    padding: 20
  },
  inputSection: {
    flexGrow: 0,
    flexShrink: 0
  },
  para: {
    color: '#8e8e8e',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  section: {
    backfaceVisibility: 'hidden',
    backgroundColor: 'transparent',
    flexDirection: 'column'
  }
};
