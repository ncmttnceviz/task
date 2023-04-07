<?php

namespace App\Services;

use App\Repository\FlagRepository;
use Illuminate\Http\Request;

class FlagService
{
    private FlagRepository $flagRepository;

    /**
     * @param FlagRepository $flagRepository
     */
    public function __construct(FlagRepository $flagRepository)
    {
        $this->flagRepository = $flagRepository;
    }

    /**
     * @return array
     */
    public function getAll() : array
    {
        return $this->flagRepository->findAll()->toArray();
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function createFlag(Request $request) : bool
    {
        return $this->flagRepository->create($request->get('title'), $request->get('colorCode'));
    }
}
