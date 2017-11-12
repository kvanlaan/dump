import { DumpAngularPage } from './app.po';

describe('dump-angular App', () => {
  let page: DumpAngularPage;

  beforeEach(() => {
    page = new DumpAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
