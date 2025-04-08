import numpy as np
import polars as pl


def sigmoid_scale(x):
    return 1 / (1 + np.exp(-x))


def update_hla_columns(df: pl.DataFrame) -> pl.DataFrame:
    df = df.with_columns(
        (pl.col('hla_match_a_low').fill_null(0) +
         pl.col('hla_match_b_low').fill_null(0) +
         pl.col('hla_match_drb1_high').fill_null(0)).alias('hla_nmdp_6'),

        (pl.col('hla_match_a_low').fill_null(0) +
         pl.col('hla_match_b_low').fill_null(0) +
         pl.col('hla_match_drb1_low').fill_null(0)).alias('hla_low_res_6'),

        (pl.col('hla_match_a_high').fill_null(0) +
         pl.col('hla_match_b_high').fill_null(0) +
         pl.col('hla_match_drb1_high').fill_null(0)).alias('hla_high_res_6'),

        (pl.col('hla_match_a_low').fill_null(0) +
         pl.col('hla_match_b_low').fill_null(0) +
         pl.col('hla_match_c_low').fill_null(0) +
         pl.col('hla_match_drb1_low').fill_null(0)).alias('hla_low_res_8'),

        (pl.col('hla_match_a_high').fill_null(0) +
         pl.col('hla_match_b_high').fill_null(0) +
         pl.col('hla_match_c_high').fill_null(0) +
         pl.col('hla_match_drb1_high').fill_null(0)).alias('hla_high_res_8'),

        (pl.col('hla_match_a_low').fill_null(0) +
         pl.col('hla_match_b_low').fill_null(0) +
         pl.col('hla_match_c_low').fill_null(0) +
         pl.col('hla_match_drb1_low').fill_null(0) +
         pl.col('hla_match_dqb1_low').fill_null(0)).alias('hla_low_res_10'),

        (pl.col('hla_match_a_high').fill_null(0) +
         pl.col('hla_match_b_high').fill_null(0) +
         pl.col('hla_match_c_high').fill_null(0) +
         pl.col('hla_match_drb1_high').fill_null(0) +
         pl.col('hla_match_dqb1_high').fill_null(0)).alias('hla_high_res_10'),
    )
    return df
