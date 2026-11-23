<?php

namespace App\Http\Repositories;


use App\Models\Stage;
use App\Models\StageResult as Model;
use Illuminate\Support\Facades\DB;

class StageResultRepository extends CoreRepository
{
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
                    $stage->whereYear('race_start', $year);
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
            ->whereYear('race_start', '<=', $currentYear)
            ->pluck('race_start')
            ->map(fn ($date) => (int) substr($date, 0, 4))
            ->merge([$currentYear, $currentYear - 1])
            ->unique()
            ->sortDesc()
            ->values()
            ->all();
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
