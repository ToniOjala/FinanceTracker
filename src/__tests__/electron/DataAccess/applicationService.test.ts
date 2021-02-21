import ApplicationService from '../../../electron/DataAccess/services/applicationService';

describe('applicationService', () => {
  const applicationService = new ApplicationService();
  const initialLastOpened = '2021-02-19';

  afterAll(() => applicationService.setLastOpened(initialLastOpened));

  it('getLastOpened returns correct value', () => {
    const lastOpened = applicationService.getLastOpened();
    expect(lastOpened).toEqual(initialLastOpened);
  })

  it('setLastOpened updates table correctly', () => {
    const newLastOpened = '2021-02-21';
    applicationService.setLastOpened(newLastOpened);
    const updatedLastOpened = applicationService.getLastOpened();
    expect(updatedLastOpened).toEqual(newLastOpened);
  })
})