<?php

namespace App\Http\Repositories;


use App\Models\Stage;
use App\Models\StageResult as Model;
use Illuminate\Support\Facades\DB;

class StageResultRepository extends CoreRepository
{
    private const SEASON_START_MONTH = 11;

    protected function getModelClass()
    {
        return Model::class;
    }

    public function getUsersRating(?int $year = null)
    {
        $columns = [
            'users.nickname', 'users.name', 'users.surname',
            'stage_results.user_id', DB::raw('SUM(stage_results.result) as total'),
        ];

        return $this->startConditions()
            ->join('users', 'stage_results.user_id', '=', 'users.id')
            ->whereHas('stage', function ($stage) use ($year) {
                $stage->where('status', 'finished');
                if ($year !== null) {
                    $stage->where('race_start', '>=', $this->seasonStart($year));
                    if ($year < 9999) {
                        $stage->where('race_start', '<', $this->seasonStart($year + 1));
                    }
                }
            })
            ->select($columns)
            ->groupBy('stage_results.user_id', 'users.nickname', 'users.name', 'users.surname')
            ->orderByDesc('total')
            ->orderBy('stage_results.user_id')
            ->paginate(50);
    }

    public function getRatingYears(int $currentYear): array
    {
        return Stage::query()
            ->where('status', 'finished')
            ->where('race_start', '>=', $this->seasonStart(1000))
            ->where('race_start', '<', $this->seasonStart($currentYear + 1))
            ->pluck('race_start')
            ->map(fn ($date) => $this->seasonStartYear((int) substr($date, 0, 4), (int) substr($date, 5, 2)))
            ->merge([$currentYear, $currentYear - 1])
            ->unique()
            ->sortDesc()
            ->values()
            ->all();
    }

    public function seasonStartYear(int $year, int $month): int
    {
        return $month < self::SEASON_START_MONTH ? $year - 1 : $year;
    }

    private function seasonStart(int $year): string
    {
        return sprintf('%04d-%02d-01', $year, self::SEASON_START_MONTH);
    }

    public function getUniversityRating()
    {
        $columns = [
            'universities.name',
            DB::raw('SUM(result) as total')
        ];


        $result = $this->startConditions()
            ->join('users', 'stage_results.user_id', '=', 'users.id')
            ->join('universities', 'users.university_id', 'universities.id')
            ->select($columns)
            ->groupBy('university_id')
            ->orderBy('total', 'DESC')
            ->paginate(10);


        return $result;
    }

    public function getTeamRating()
    {
        $columns = [
            'teams.name',
            DB::raw('SUM(result) as total')
        ];


        $result = $this->startConditions()
            ->join('stage_user', function($join) {
                $join->on('stage_results.stage_id', '=', 'stage_user.stage_id');
                $join->on('stage_results.user_id', '=', 'stage_user.user_id');
            })
            ->join('teams', 'stage_user.team_id', '=', 'teams.id')
            ->select($columns)
            ->groupBy('team_id')
            ->orderBy('total', 'DESC')
            ->paginate(10);

        return $result;
    }
}
