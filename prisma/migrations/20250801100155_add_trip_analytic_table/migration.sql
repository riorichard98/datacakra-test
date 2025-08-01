-- CreateTable
CREATE TABLE "public"."trip_analytics" (
    "trip_analytic_id" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_trips" INTEGER NOT NULL,
    "total_tourists" INTEGER NOT NULL,
    "avg_trip_duration_in_days" DOUBLE PRECISION NOT NULL,
    "top_destination" JSONB NOT NULL,

    CONSTRAINT "trip_analytics_pkey" PRIMARY KEY ("trip_analytic_id")
);
