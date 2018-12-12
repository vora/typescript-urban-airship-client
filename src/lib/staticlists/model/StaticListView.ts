export type StaticListStatus = 'ready' | 'processing' | 'failed'

export class StaticListView {
  constructor(
    public ok: boolean,
    public name: string,
    public description: string,
    public status: StaticListStatus,
  ) {}
}
