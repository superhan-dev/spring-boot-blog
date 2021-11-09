import headerRducer, {
  HeaderState,
  openSidebar,
  closeSidebar
} from './headerSlice'
import AppsIcon from '@mui/icons-material/Apps';


describe("open, close sidebar", () => {
  const initialState: HeaderState = {
    mobileOpen: false,
    changeColorOnScroll: {
      height: 200,
      color: "white",
    },
    menus: [
      { name: "components", icon: (AppsIcon) }
    ]
  };

  it('open it', () => {
    const actual = (headerRducer(initialState, openSidebar()));
    expect(actual.mobileOpen).toEqual(true);
  })


  it('close it', () => {
    const actual = (headerRducer(initialState, closeSidebar()));
    expect(actual.mobileOpen).toEqual(false);
  })
})