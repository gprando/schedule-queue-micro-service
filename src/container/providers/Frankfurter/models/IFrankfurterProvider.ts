export default interface IFrankfurterProvider {
  getData(from?: string): Promise<any>;
}
