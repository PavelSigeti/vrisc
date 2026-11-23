<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Repositories\StageResultRepository;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    protected $stageResultRepository;

    public function __construct()
    {
        $this->stageResultRepository = app(StageResultRepository::class);
    }

    public function usersRating(Request $request)
    {
        $today = now();
        $currentYear = $this->stageResultRepository->seasonStartYear($today->year, $today->month);
        $filter = $request->validate([
            'year' => ['sometimes', 'required', 'regex:/\A(?:all|current|[1-9][0-9]{3})\z/'],
        ])['year'] ?? 'all';

        $year = match ($filter) {
            'all' => 'all',
            'current' => $currentYear,
            default => (int) $filter,
        };
        $rating = $this->stageResultRepository->getUsersRating(is_int($year) ? $year : null);

        return $rating->appends(['year' => $year])->toArray() + [
            'year' => $year,
            'years' => $this->stageResultRepository->getRatingYears($currentYear),
        ];
    }

    public function universityRating()
    {
        return $this->stageResultRepository->getUniversityRating();
    }

    public function teamRating()
    {
        return $this->stageResultRepository->getTeamRating();
    }
}
